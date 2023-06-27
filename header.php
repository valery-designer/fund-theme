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

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg <?php if(is_page('inmemory')) echo 'dark' ?>">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site_wrapper">

<header>
    <div class="header_block">
        <img class="logo" src="<?= get_template_directory_uri().(is_page('inmemory') ? '/images/logo_dark_1.svg' : '/images/logo_1.svg') ?>" />
        <div class="logo_block"><a href="<?= get_home_url() ?>/inmemory/">благотворительный&nbsp;фонд&nbsp;имени Нурмагомеда&nbsp;Энгельсовича&nbsp;Гаджимагомедова</a></div>
        <a href="<?= get_home_url() ?>" class="home_link"></a>
        <div class="big_button black"><a href="/getaid">ПОПРОСИТЬ ПОМОЩЬ!</a></div>
        <div class="big_button red"><a href="/setaid">ПОМОЧЬ ДРУГИМ!</a></div>
        <div id="about_menu_1" class="menu_button">
            <div class="button">О ФОНДЕ</div>
            <div class="menu_block">
                <div class="curtain"></div>
                <div class="the_menu">
                    <div>
                        <div class="in_memory">
                            <img src="<?= get_template_directory_uri() ?>/images/star_1.svg" />
                            <div>Памяти<br/>героя</div>
                            <a href="<?= get_home_url() ?>/inmemory/"></a>
                        </div>
                        <?= wp_nav_menu( ['menu' => 'About_1'] ); ?>
                        <!-- <ul>
                            <li>Документы</li>
                            <li>Контакты</li>
                        </ul> -->
                    </div>
                </div>
            </div>
            <script>
                class Wmenu {
                    constructor(menuId) {
                        this.button = document.querySelector("#"+menuId+" .button");
                        this.curtain = document.querySelector("#"+menuId+" .curtain");
                        this.menu = document.querySelector("#"+menuId+" .menu_block");
                        if (!this.button || !this.curtain || !this.menu) return null;
                        this.initMenu();
                    }
                    initMenu(){
                        this.button.addEventListener('click', () => {
                            this.showMenu();
                        })
                        this.curtain.addEventListener('click', () => {
                            this.hideMenu();
                        })
                    }
                    showMenu(){
                        this.menu.classList.add('on');
                    }
                    hideMenu(){
                        this.menu.classList.remove('on');
                    }
                }
                document.addEventListener('DOMContentLoaded', () => {
                    let aboutMenu = new Wmenu('about_menu_1');
                });
            </script>
        </div>
    </div>

    <?php if(is_front_page()) : ?>
    <div class="header_banner">
        <div class="back"></div>
        <div class="not_so_back"></div>
        <div class="banner">
            <div class="left"></div>
            <div class="center">Фонд носит имя Героя России Нурмагомеда Энгельсовича Гаджимагомедова</div>
            <div class="right"><a href="/inmemory">Узнать подробнее</a></div>            
        </div>
        <div class="social_block">
            <div class="social tg"><a href="https://t.me/engelspatriot" target="_blank"></a></div>
            <!-- <div class="social vk"><a href=".." target="_blank"></a></div> -->
        </div>
    </div>
    <?php endif; ?>
</header>
