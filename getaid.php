<article id="post-<?php the_ID(); ?>" class="single_block aid_page">
    
    <h1>Как получить помощь?</h1>
    <p>Если Вам нужна помощь, пожалуйста, заполните и отправьте предварительную заявку ниже.</p>
    <p>Обязательно включите</p>
    <ul>
        <li>описание ситуации,</li>
        <li>контактную информацию.</li>
    </ul>
    <p>Будьте готовы предоставить по запросу:</p>
    <ol>
        <li>медицинские и прочие документы, подтверждающие ваш случай</li>
        <li>счёт за медицинские и/или другие услуги.</li>
    </ol>
    <p>В течение трех рабочих дней Ваша заявка будет рассмотрена, и Вам на электронную почту придёт ответ. 
        При положительном решении об оказании помощи с Вами свяжется Ваш координатор, 
        который расскажет Вам всю последовательность дальнейших действий.</p>

    <div class="contact_form">
        <?php
            $content = '[contact-form-7 id="162" title="Aid initial sheet"]';
            $content = apply_filters( 'the_content', $content );
            $content = str_replace( ']]>', ']]&gt;', $content );
            echo $content;
        ?>
        <?php echo do_shortcode('[form_response]'); ?>
    </div>

</article>