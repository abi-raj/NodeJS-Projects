function addBook() {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const language = document.getElementById('language').value;
    const pages = document.getElementById('pages').value;
    const year = document.getElementById('year').value;
    const country = document.getElementById('country').value;
    const image = document.getElementById('image').value;
    const link = document.getElementById('link').value;

    if (title.length > 0 && author.length > 0 && language.length > 0 && country.length > 0 && image.length > 0 && link.length > 0 && pages.length > 0 && year.length > 0) {
        axios({
            method: 'post',
            url: '/api/add',
            data: {
                title: title,
                author: author,
                language: language,
                pages: pages,
                year: year,
                country: country,
                imageLink: image,
                link: link
                 }
        }).then((response) => {
            console.log(response);
            if(response.status==200){
                window.location.replace('/');
            }
          
        }).catch((err) => {
            console.log(err);
            alert('Could not add!')
        });
    }
    else{
        alert('Please fill all the values!');
    }
}