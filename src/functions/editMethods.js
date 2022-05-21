
const Edit = {
    showEditBox: function(e){
        const editBox = document.getElementById('text_edit_box');
        return editBox.style.display = 'flex';
    },
   
    hideEditBox: function(e){
        const editBox = document.getElementById('text_edit_box');
        return editBox.style.display = 'none';
    }

}

export default Edit;