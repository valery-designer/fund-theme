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
    <script>const thisProgramId = Number('<?= get_field('program_id') ?>')</script>
    <article id="post-<?php the_ID(); ?>" class="single_block program_single">

        <h1><?= the_title(); ?></h1>
        <div class="pr_main_block" style="background-image:url(<?= get_field('pr_image_h'); ?>)">
            <div class="curtain"></div>
            <div id="miniapp-payment" class="block">
            </div>
        </div>
        <p class="pr_description"><?= get_field('pr_description') ?></p>
        <?= get_the_content(); ?>


        <?php /*
            $sbqr = new SberpayQR();
            echo 'Token: '.$sbqr->getOauthToken(); 
            echo 'MEMBER_ID: '.MEMBER_ID;
        */ 
        // echo 'wera: '.SBP_TERMINAL_ID.'|';
        ?>

    </article>

<?php endif; ?>

<?php /*
{
    id:1,
    title:'Тем, кто на передовой',
    imageH:'http://fund.loc/app/uploads/2022/06/default_program_photo_horizontal.png',
    text: 'Собираем деньги на рации, спальные мешки, медикаменты, чтобы помочь солдатам и офицерам на боевых позициях. Наши партнеры в регионах готовы обеспечить сбор необходимых вещей, возьмут на себя логистику, транспорт, склады, взаимодействие с таможней и доставку грузов военным республиканских союзных сил.',
    permalink: 'http://fund.loc/тем-кто-на-передовой',
    target: 1000000,
    got: 187000,
  },
*/ ?>