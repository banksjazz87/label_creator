
const Edit = {
    showEditBox: function(e){
        const editBox = document.getElementById('text_edit_box');
        Edit.setCurrentClickedId(e.target.id);
        console.log(Edit.getCurrentClickedId());
        return editBox.style.display = 'flex';
    },
   
    hideEditBox: function(e){
        const editBox = document.getElementById('text_edit_box');
        return editBox.style.display = 'none';
    },

    currentClickedId: "",
    
    setCurrentClickedId: function(value){
        return Edit.currentClickedId = value;
    },

    getCurrentClickedId: function(){
        return Edit.currentClickedId;
    }

}

export default Edit;