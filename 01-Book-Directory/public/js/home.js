function onDelete(id) {
    console.log(document.getElementById('t' + id).innerHTML);
    const title = document.getElementById('t' + id).innerHTML;
    axios({
        method: 'delete',
        url: '/api/delete/' + title,
    }).then((response) => {
        window.location.reload();
    }).catch((err) => {
        console.log(err);
        alert('Could not delete!')
    });

}

function onEdit(id) {
    console.log(document.getElementById('t' + id).innerHTML);
    const title = document.getElementById('t' + id).innerHTML;
    window.location.href='/update/' + title;

}