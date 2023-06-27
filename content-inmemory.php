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
        <div class="in_memory_block">
            <div>
                <div class="intro_title">
                        наш<br/>
                        благотворительный <br/>
                        фонд <br/>
                        носит имя<br/>
                        Героя России<br/><br/>
                    <div>
                        Нурмагомеда<br/>
                        Энгельсовича<br/>
                        Гаджимагомедова<br/>
                    </div>    
                </div>
            </div>
        </div>
        <div class="in_memory_placeholder"></div>
        <div class="in_memory_column">
            <div class="powerspeech">
                Старший лейтенант<br/>
                Нурмагомед Гаджимагомедов. <br/>
                Ему было 25 лет.<br/><br/>
                Оказавшись в окружении, офицер последней гранатой подорвал себя и окруживших его противников.<br/><br/>
                Это о нём Владимир Путин произнёс свою знаменитую речь: «Я - лакец, я - дагестанец, я - чеченец, ингуш, русский...»<br/><br/>
                Это он стал первым участником спецоперации, удостоившимся высшей награды РФ, звания Героя России.
                К сожалению, посмертно.
            </div>
            <div class="candle_block">
                <div class="candle"></div>
                <div class="oh_george"></div>
            </div>
            <?= get_the_content(); ?>
        </div>

    </article>

<?php endif; ?>
