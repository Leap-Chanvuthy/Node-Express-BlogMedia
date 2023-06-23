  // Get the form element
  const editBlogForm = document.getElementById('editBlogForm');

  // Add an event listener to the form's submit event
  editBlogForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(editBlogForm); // Create a new FormData object with the form data
    const url = editBlogForm.getAttribute('action'); // Get the form action URL

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const updatedBlog = await response.json(); // Assuming the server returns the updated blog data as JSON

        // Display the updated blog data on the frontend
        document.getElementById('title').textContent = updatedBlog.title;
        document.getElementById('description').textContent = updatedBlog.description;

        // Redirect to the homepage or any other desired page
        window.location.href = '/'; // Replace with the desired URL
      } else {
        console.error('Failed to update blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  });

