function apagaItem(id) {
  console.log("A apagar o item " + id);
  axios
    .delete("/delete/" + id)
    .then(response => {
      window.location.assign("/");
    })
    .catch(function(error) {
      console.log("Error in apagaItem");
    });
}

function actualizaItem(id) {
  console.log("A actualizar o item de id " + id);
  let updatedArq = {
    prov: document.getElementsByName("prov")[0].value,
    musico: document.getElementsByName("musico")[0].value,
    local: document.getElementsByName("local")[0].value,
    tit: document.getElementsByName("tit")[0].value
  };
  axios
    .put("/arq/update/" + id, updatedArq)
    .then(response => {
      window.location.assign(`/arq/${id}`);
    })
    .catch(function(error) {
      console.log("Error in actualizaItem");
    });
}
