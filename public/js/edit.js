// const editBlogForm = document.getElementById('editBlogForm');
//   editBlogForm.addEventListener ('submit' , async (event) => {
//     event.preventDefault();
//     const formdata = new FormData (editBlogForm);
//     const blogId = '<%= blog._id %>' ;

//     try {
//       const respone = fetch (`/blog/edit/${blogId}` , {
//         method : 'PUT',
//         body : formdata
//       });
//       if (respone.ok){
//         const updatedBlog = await res.json();
//         consolog.log ('updated successfully ' , updatedBlog);
//         window.location.href = '/';
//       }else {
//         console.log ('cannot update a blog');
//       }
//     }
//     catch (err){
//       console.log ('cannot update a blog');
//     }
//   })

// Get the form element
const editBlogForm = document.getElementById('editBlogForm');

// Add event listener for form submission
editBlogForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the blog ID from the form action attribute
  const blogId = editBlogForm.action.split('/').pop();

  // Get the updated title and description values
  const title = editBlogForm.title.value;
  const description = editBlogForm.description.value;

  try {
    // Send an AJAX request to update the blog
    const response = await fetch(`/blog/edit/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    
    if (response.ok) {
      // Blog updated successfully
      window.location.href = '/'; // Redirect to the home page
    } else {
      // Failed to update the blog
      console.error('Failed to update the blog');
    }
  } catch (err) {
    console.error(err);
  }
});
