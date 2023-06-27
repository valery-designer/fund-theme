<article id="post-<?php the_ID(); ?>" class="single_block aid_page">
    
    <h1>Как помочь?</h1>
    <p>Есть несколько способов оказать содействие:</p>
    <ol>
    <li>Вы можете пожертвовать некоторую сумму денег в адрес конкретной<a href=".."> программы помощи</a> через систему моментальных платежей.</li>
    <li>Можно перечислить деньги и традиционным способом на расчётный счет фонда по <a href="/реквизиты">платёжным реквизитам</a>.</li>
    <li>Вы можете также присоединиться к деятельности фонда в качестве волонтёра. Для этого нужно подать предварительную заявку.</li>
    </ol>

    <div class="contact_form">
        <?php
            $content = '[contact-form-7 id="106" title="Volunteer initial sheet"]';
            $content = apply_filters( 'the_content', $content );
            $content = str_replace( ']]>', ']]&gt;', $content );
            echo $content;
        ?>
        <?php echo do_shortcode('[form_response]'); ?>
    </div>

</article>
