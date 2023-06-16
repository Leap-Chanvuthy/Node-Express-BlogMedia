document.addEventListener ('DOMContentLoaded' , ()=>{
    const createBlogForm = document.getElementById('createBlogForm');
    createBlogForm.addEventListener ('submit' , handleSubmit);
})

const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData (form);
    
    fetch ('/create-blog' , {
        method : 'POST',
        body : formData
    })
    .then (respone => respone.json())
    .then (data => {
        // successfully handle upload data 
        window.location.href = '/';
        console.log ('Field uploaded successfully ' + data);
    })
    .catch ((err) =>{
        console.log ('Field is failed to upload'  + err);
    })

} 