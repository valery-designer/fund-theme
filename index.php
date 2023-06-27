<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>

<?php get_header(); ?>



<?php // if ( is_front_page() ) : 
	$programs = [];
	$p_query = new WP_Query(['post_type' => 'program', 'post_status' => 'publish']);
	if( $p_query->have_posts() ) :
		while ( $p_query->have_posts() ) : 
			$p_query->the_post(); 
				$program = [
					'id' => get_field('program_id'),
					'title' => get_the_title(),
					'image_h' => get_field('pr_image_h'),
					'image_v' => get_field('pr_image_v'),
					'text' => get_field('pr_description'),
					'permalink' => get_permalink(),
					'content' => get_the_content(),
					'in_slider' => true,
					'target' => get_field('pr_target'),
					'firebase_id' => get_field('firebase_id'),
					'got' => 0,					
				];
				$programs[] = $program;
		endwhile; 
		// echo'<pre>'; print_r($programs); echo'</pre>';
	endif; ?>
<script>
	const jsonProgs = <?= json_encode($programs) ?>;
</script>


<?php //endif;
wp_reset_query(); 
?>



<div id="primary" class="content-area">
<main id="main" class="site-main">
<?php if ( is_front_page() ) : ?>

	<div id="miniapp-slider" class="slider_container">
		<div class="slider_block">
		</div>    
	</div>

	<div class="front_section_block">
		<div class="fp_video_block">
			<div class="fp_video_text">
				<div class="fp_video_text_header">Фильм, посвященный Герою России <br/>Нурмагомеду Гаджимагомедову.</div>
				<div class="fp_video_text_p">Видео длится всего 5 минут, но в нем отражено все – и героический подвиг Нурмагомеда, 
					и его любовь к Родине, к родным и близким, к жизни, и горечь утраты…</div>
				<div class="fp_video_text_titles">Автор слов и исполнитель песни - Залиха Катибов</div>
				<div class="fp_video_text_titles">Музыка - Керима Кадинаева</div>
				<div class="fp_video_text_titles">Аранжировка - Эмиля Гыстарова</div>
				<div class="fp_video_text_titles">Голос и мастеринг - Рустама Гусейнова</div>
				<div class="fp_video_text_titles">Монтаж - Карины Далиевой</div>
			</div>
			<div class="fp_video">
				<figure class="wp-block-video">
					<video controls="" src="<?= get_home_url(); ?>/app/uploads/2023/03/Видеофильм-про-Нурмагомеда.mp4"></video>
				</figure>
			</div>
		</div>
	</div>

	<div class="front_section_block">
		<div class="front_section_header">Новости фонда 
			<?php 
				// echo '<br/>PROGRAM# '.get_field('program_id', 16).', '.get_the_title(16);
				// echo '<br/>PROGRAM# '.get_field('program_id', 74).', '.get_the_title(74).', '.get_field('firebase_id', 74);
				// do_action( 'firebase_vd_set_got', 5 );
				// do_action( 'firebase_vd_add_got_record', 4, 57 );
			?>
		</div>
		<?php $news_query = new WP_Query(['post_type' => 'post', 'post_status' => 'publish']); ?>
		<?php if( $news_query->have_posts() ): ?>
			<div class="front_section_content_block">
				<?php while ( $news_query->have_posts() ): ?>
					<?php $news_query->the_post(); ?>
					<div class="newsitem_front_block">
						<div class="newsitem_date_block"><?= get_the_date() ?></div>
						<div class="newsitem_info_block">
							<div class="title"><?= the_title() ?></div>
							<div class="text"><?= get_the_content() ?></div>
						</div>
						<a href="<?= esc_url(get_permalink()); ?>" class="curtain"></a>
					</div>	
				<?php endwhile; ?>
			</div>
		<?php else: ?>
			<div class="front_section_content_block_empty">Здесь будут появляться новости по мере их добавления</div>
		<?php endif; ?>
	</div>

	<?php /*
	<div class="front_section_block">
		<div class="front_section_header">Нужна помощь</div>

		<?php if( sizeof($programs)>0 ): ?>
			<div class="front_section_content_block">
				<?php foreach($programs as $program) : ?>
					<div class="program_front_block" style="background-image:url('<?= $program['image_v'] ?>');">
						<div class="curtain"></div>
						<div class="program_number_block">№&nbsp;0<?= $program['id'] ?></div>
						<div class="program_info_block">
							<div class="title"><?= $program['title'] ?></div>
							<div class="text"><?= $program['text'] ?></div>
						</div>
						<div class="program_progress_block">
							<div class="indicator"><div class="progress" style="width:3%;"></div></div>
							<div class="numbers"><div><?= $program['got'] ?> р.</div><div><?= $program['target'] ?> р.</div></div>
						</div>
						<a class="a_curtain" href="<?= $program['permalink'] ?>"></a>
					</div>
				<?php endforeach; ?>
			</div>
		<?php else: ?>
			<div class="front_section_content_block_empty">Здесь будут появляться программы помощи по мере их добавления</div>
		<?php endif; ?>
	</div>
	*/ ?>

	<div class="front_section_block">
		<div class="front_section_header">Нужна помощь</div>
		<div id="miniapp-programs"></div>
	</div>

<?php /*
	<div class="front_section_block">
		<div class="front_section_header">Нужна помощь</div>
		<?php $pr_query = new WP_Query(['post_type' => 'program', 'post_status' => 'publish']); ?>
		<?php if( $pr_query->have_posts() ): ?>
			<div class="front_section_content_block">
				<?php while ( $pr_query->have_posts() ): ?>
					<?php $pr_query->the_post(); ?>
					<div class="program_front_block" style="background-image:url('<?= get_field('pr_image_v'); ?>');">
						<div class="curtain"></div>
						<div class="program_number_block">№&nbsp;0<?= get_field('program_id') ?></div>
						<div class="program_info_block">
							<div class="title"><?= the_title() ?></div>
							<div class="text"><?= get_field('pr_description') ?></div>
						</div>
						<div class="program_progress_block">
							<div class="indicator"><div class="progress" style="width:3%;"></div></div>
							<div class="numbers"><div>187400 р.</div><div><?= get_field('pr_target'); ?> р.</div></div>
						</div>
						<a class="a_curtain" href="<?= get_permalink() ?>"></a>
					</div>
				<?php endwhile; ?>
			</div>
		<?php else: ?>
			<div class="front_section_content_block_empty">Здесь будут появляться программы помощи по мере их добавления</div>
		<?php endif; ?>
	</div>
*/ ?>

<?php else: ?>

	<?php
		if ( have_posts() ) {
			while ( have_posts() ) {
				the_post();
				$page_variation = '';
				if( is_page('setaid') ) $page_variation = 'setaid';
				if( is_page('getaid') ) $page_variation = 'getaid';
				if( is_page('inmemory') ) $page_variation = 'inmemory';

				switch ($page_variation) {
					case "setaid":
						get_template_part('setaid');
					break;
					case "getaid":
						get_template_part('getaid');
					break;
					case "inmemory":
						get_template_part('content', 'inmemory');
					break;
					default:
					get_template_part( 'content', get_post_type() );
				}

			}
		}
		else {
			get_template_part( 'content', 'none' );
		}
	?>
<?php endif; ?>


</main><!-- #main -->
</div><!-- .content-area -->

<?php get_footer(); ?>
