const Edit = {
  showEditBox: function (e) {
    const editBox = document.getElementById("text_edit_box");
    Edit.set.clickedId(e.target.id);
    Edit.set.clickedValue(e.target.textContent);
    console.log(Edit.get.clickedId());
    console.log(Edit.get.clickedValue());
    return (editBox.style.display = "flex");
  },

  hideEditBox: function (e) {
    const editBox = document.getElementById("text_edit_box");
    return (editBox.style.display = "none");
  },

  currentClickedId: "",
  clickedValue: "",

  set: {
    clickedId: function (value) {
      Edit.currentClickedId = value;
    },
    clickedValue: function (value) {
      Edit.clickedValue = value;
    },
  },

  get: {
    clickedId: function () {
      return Edit.currentClickedId;
    },
    clickedValue: function () {
      return Edit.clickedValue;
    },
  },
};

export default Edit;
