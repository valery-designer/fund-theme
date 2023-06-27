<?php

//update_option( 'home', 'http://fund.loc' );
//update_option( 'siteurl', 'http://fund.loc/wp' );

// shows the current admin page file
// function wpdocs_myselective_css_or_js( $hook ) {
//     echo '<h1 style="color: crimson;">' . esc_html( $hook ) . '</h1>';
// }
 
// add_action( 'admin_enqueue_scripts', 'wpdocs_myselective_css_or_js' ); 

// function that runs when shortcode is called
function wpb_demo_shortcode() { 
  
	// Things that you want to do.
	$message = 'Hello world!'; 
	  
	// Output needs to be return
	return $message;
	}
	// register shortcode
add_shortcode('greeting', 'wpb_demo_shortcode');

function form_response_shortcode() 
{ 
	$out = ' 
	<div class="response">
		<div>
			<div class="lining"></div>
			<div class="box">
				<div class="content">
					Спасибо. Ваша заявка отправлена успешно.
				</div>
				<div class="buttons_block">
					<div class="d_button ok" onClick="">Закрыть</div>
				</div>
			</div>
		</div>
	</div>
	';
	return $out;
}
add_shortcode('form_response', 'form_response_shortcode');

function add_script_to_menu_page()
{
    // $pagenow, is a global variable referring to the filename of the current page, 
    // such as ‘admin.php’, ‘post-new.php’
    global $pagenow;
    if ($pagenow != 'post.php' && $pagenow != 'post-new.php') return;
    // loading css
    wp_register_style( 'program-admin-css', get_template_directory_uri() . '/css/w_admin.css', false, '1.0.1' );
    wp_enqueue_style( 'program-admin-css' );
    // loading js
    // wp_register_script( 'some-js', get_template_directory_uri().'/js/some.js', array('jquery-core'), false, true );
    // wp_enqueue_script( 'some-js' );
}
add_action( 'admin_enqueue_scripts', 'add_script_to_menu_page' );

function register_custom_styles_scripts() {
	wp_register_style( 'style_css', get_template_directory_uri() . '/style.css');
    wp_register_style( 'w_style_css', get_template_directory_uri() . '/css/w_style.css');
	wp_register_script( 'script', get_template_directory_uri() . '/js/index.js', 
	['wp-element'],
	time(), // Change this to null for production,
	true);
	wp_register_script( 'frontpage_miniapp', get_template_directory_uri() . '/miniapps/frontpage/build/index.js', 
	['wp-element'],
	time(), // For production use wp_get_theme()->get('Version'),
	true);
    wp_register_script('contact_form', get_template_directory_uri().'/js/contact_form.js', [], time(), true);
}
add_action('init', 'register_custom_styles_scripts');

function enqueue_custom_styles_scripts() {
	wp_enqueue_style( 'style_css' );
	wp_enqueue_style( 'w_style_css' ); 
	wp_enqueue_script( 'frontpage_miniapp' );
	wp_enqueue_script( 'script' );
	if (is_page('contacts') || is_page('getaid') || is_page('setaid')) {
        wp_enqueue_script('contact_form');
    }
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_styles_scripts' );

 
function themeprefix_load_fonts() { 
?> 
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@300;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap" rel="stylesheet"> 

<?php 
}
add_action( 'wp_head', 'themeprefix_load_fonts' );


function vd_setup() {
	register_nav_menus( array(
		'About_1' =>'About_menu',
	) );
}
add_action( 'after_setup_theme', 'vd_setup');


function create_posttype() {
  register_post_type( 'program',
    array(
      'labels' => array(
        'name' => __( 'Programs' ),
        'singular_name' => __( 'Program' )
      ),
      'public' => true,
      'has_archive' => true,
	  'show_in_rest' => true,
	  'supports' => array (
	  	'title',
		'editor'
	  ),
    //   'rewrite' => array('slug' => 'программа'),
	  'taxonomies' => array('category'),
    )
  );
}
add_action( 'init', 'create_posttype' );

function add_my_post_types_to_query( $query ) {
  if ( $query->is_main_query() && !is_home() )
  
    $query->set( 'post_type', array( 'post', 'page', 'program', ) );
  return $query;
}
//add_action( 'pre_get_posts', 'add_my_post_types_to_query' );  

/**
 * Disable admin bar on the frontend of your website
 * for subscribers.
 */
function w_disable_admin_bar() { 
	if ( ! current_user_can('edit_posts') ) {
		add_filter('show_admin_bar', '__return_false');	
	}
}
add_action( 'after_setup_theme', 'w_disable_admin_bar' );

function add_taxonomies_to_pages() {
 register_taxonomy_for_object_type( 'category', 'page' );
 }
add_action( 'init', 'add_taxonomies_to_pages' );
 
/**
 * Redirect back to homepage and not allow access to 
 * WP admin for Subscribers.
 */
function w_redirect_admin(){
	if ( ! defined('DOING_AJAX') && ! current_user_can('edit_posts') ) {
		wp_redirect( site_url() );
		exit;		
	}
}
add_action( 'admin_init', 'w_redirect_admin' );


if ( ! function_exists( 'w_excerpt' ) ) :
	/**
	 * Displays the optional excerpt.
	 *
	 * Wraps the excerpt in a div element.
	 *
	 * Create your own twentysixteen_excerpt() function to override in a child theme.
	 *
	 * @since Twenty Sixteen 1.0
	 *
	 * @param string $class Optional. Class string of the div element. Defaults to 'entry-summary'.
	 */
	function w_excerpt( $class = 'entry-summary' ) {
		$class = esc_attr( $class );

		if ( has_excerpt() || is_search() ) : ?>
			<div class="<?php echo $class; ?>">
				<?php the_excerpt(); ?>
			</div><!-- .<?php echo $class; ?> -->
		<?php endif;
	}
endif;

if ( ! function_exists( 'w_entry_date' ) ) :
/**
 * Prints HTML with date information for current post.
 *
 * Create your own twentysixteen_entry_date() function to override in a child theme.
 *
 * @since Twenty Sixteen 1.0
 */
function w_entry_date() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		get_the_date(),
		esc_attr( get_the_modified_date( 'c' ) ),
		get_the_modified_date()
	);

	printf( '<span class="posted-on"><span class="screen-reader-text">%1$s </span><a href="%2$s" rel="bookmark">%3$s</a></span>',
		_x( 'Posted on', 'Used before publish date.', 'twentysixteen' ),
		esc_url( get_permalink() ),
		$time_string
	);
}
endif;

if ( ! function_exists( 'w_entry_meta' ) ) :
/**
 * Prints HTML with meta information for the categories, tags.
 *
 * Create your own twentysixteen_entry_meta() function to override in a child theme.
 *
 * @since Twenty Sixteen 1.0
 */
function w_entry_meta() {
	if ( 'post' === get_post_type() ) {
		$author_avatar_size = apply_filters( 'twentysixteen_author_avatar_size', 49 );
		printf( '<span class="byline"><span class="author vcard">%1$s<span class="screen-reader-text">%2$s </span> <a class="url fn n" href="%3$s">%4$s</a></span></span>',
			get_avatar( get_the_author_meta( 'user_email' ), $author_avatar_size ),
			_x( 'Author', 'Used before post author name.', 'twentysixteen' ),
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			get_the_author()
		);
	}

	if ( in_array( get_post_type(), array( 'post', 'attachment' ) ) ) {
		w_entry_date();
	}

	$format = get_post_format();
	if ( current_theme_supports( 'post-formats', $format ) ) {
		printf( '<span class="entry-format">%1$s<a href="%2$s">%3$s</a></span>',
			sprintf( '<span class="screen-reader-text">%s </span>', _x( 'Format', 'Used before post format.', 'twentysixteen' ) ),
			esc_url( get_post_format_link( $format ) ),
			get_post_format_string( $format )
		);
	}

	if ( 'post' === get_post_type() ) {
		//twentysixteen_entry_taxonomies();
	}

	if ( ! is_singular() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link">';
		comments_popup_link( sprintf( __( 'Leave a comment<span class="screen-reader-text"> on %s</span>', 'twentysixteen' ), get_the_title() ) );
		echo '</span>';
	}
}
endif;

function w_theme_uri_shortcode( $attrs = array (), $content = '' )
{
    $theme_uri = is_child_theme()
        ? get_stylesheet_directory_uri()
        : get_template_directory_uri();
    return trailingslashit( $theme_uri );
}
add_shortcode('theme_uri', 'w_theme_uri_shortcode' );

remove_filter( 'the_content', 'wpautop' );

// add more buttons to the html editor
function appthemes_add_quicktags() {
    if (wp_script_is('quicktags')){
?>
    <script type="text/javascript">
    QTags.addButton( 'eg_paragraph', 'p', '<p>', '</p>', 'p', 'Paragraph tag', 1 );
	QTags.addButton( 'eg_header1', 'h1', '<h1>', '</h1>', '', 'h1 tag', 2 );
	QTags.addButton( 'eg_header2', 'h2', '<h2>', '</h2>', '', 'h2 tag', 3 );
	QTags.addButton( 'eg_header3', 'h3', '<h3>', '</h3>', '', 'h3 tag', 4 );
	QTags.addButton( 'eg_br', 'br', '<br/>', '', '', 'br tag', 5 );
	QTags.addButton( 'eg_w_ul', 'ul', '<ul>', '</ul>', '', 'ul tag', 6 );
	QTags.addButton( 'eg_w_li', 'li', '<li>', '</li>', '', 'li tag', 7 );
    </script>
<?php
    }
}
// add_action( 'admin_print_footer_scripts', 'appthemes_add_quicktags' );

// add svg upload support
function cc_mime_types($mimes) {
 $mimes['svg'] = 'image/svg+xml';
 return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

function w_imgs_shortcode($atts, $content = null) {
	$upload_dir = wp_upload_dir();
	$uploadurl= $upload_dir['url'];
	if(is_ssl())$uploadurl = str_replace( 'http://', 'https://', $uploadurl );
	$w_imgs_atts = shortcode_atts(array('first' => 1, 'last' => 1, 'ext' => 'jpg'), $atts);
	$w_f=intval($w_imgs_atts['first']); $w_l=intval($w_imgs_atts['last']); $ext=esc_html($w_imgs_atts['ext']);
	$w_c=esc_html($content); $content='';
if($w_f&&$w_l&&$w_f<=$w_l)
	for($w_i=$w_imgs_atts['first'];$w_i<=$w_imgs_atts['last'];$w_i++)
		$content.='<img class="w_img" src="'.$uploadurl.'/'.$w_c.'_'.$w_i.'.'.$ext.'" alt="" />';
    return $content;
}
// add_shortcode('w_img', 'w_imgs_shortcode');

// Activate WordPress Maintenance Mode
function wp_maintenance_mode() {
	if (!current_user_can(‘edit_themes’) || !is_user_logged_in()) {
	wp_die('<h1>Under Maintenance</h1><br />Website under planned maintenance. Please check back later.');
	}
}
//add_action('get_header', 'wp_maintenance_mode');

?>