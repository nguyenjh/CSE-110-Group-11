import React from 'react';

function RecipeAdditionalPhoto() {

    return (
        <div id='photo-upload'>
            <h2>Upload Additional Photos</h2>
            <input  hidden type='file' accept=".jpg, .jpeg, .png"/>
        </div>
    );
  }
  
  export default RecipeAdditionalPhoto;
  