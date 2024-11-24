// TODO: hidden until photos can be handled
function RecipeAdditionalPhoto() {

    return (
        <div id='photo-upload' hidden>
            <h2>Upload Additional Photos</h2>
            <input type='file' accept=".jpg, .jpeg, .png"/>
        </div>
    );
  }
  
  export default RecipeAdditionalPhoto;
  