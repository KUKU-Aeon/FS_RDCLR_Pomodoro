document.addEventListener("DOMContentLoaded", function (){
    document.getElementById('option').addEventListener('click', function (){
        document.querySelector('.labels').classList.contains('active') ?  RemoveActive():  AddActive();
    })


    function RemoveActive()
    {
        document.getElementById('option').style.zIndex = '1';
        document.querySelector('.labels').classList.remove('active')
    }

    function AddActive()
    {
        document.getElementById('option').style.zIndex = '2';
        document.querySelector('.labels').classList.add('active')
    }
})
