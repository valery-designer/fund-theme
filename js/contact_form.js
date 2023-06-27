document.addEventListener('DOMContentLoaded', () => {
    //if(document.querySelector('.wpcf7-response-output').innerHTML === '') return;
   // const r = document.querySelector('.response');
   // document.querySelector('.content').innerHTML = document.querySelector('wpcf7-response-output').innerHTML;
   // r.classList.add('on'); 
    
    document.addEventListener('wpcf7mailsent', () => { 
        setTimeout(() => {
            document.querySelector('.content').innerHTML = document.querySelector('.wpcf7-response-output').innerHTML; 
            document.querySelector('.response').classList.add('on'); 
        },10);
    }, false);
    document.querySelector('.d_button').addEventListener('click', () => {
        document.querySelector('.response').classList.remove('on');
    });
});