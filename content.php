<?php
/**
 * The template part for displaying content
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
?>

<?php if(!is_category()): ?>

    <article id="post-<?php the_ID(); ?>" class="single_block">
        <h1><?= the_title(); ?></h1>
        <?php the_content(); ?>

    </article>

<?php endif; ?>
