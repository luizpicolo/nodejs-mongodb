// CLIENT-SIDE
$(document).ready(function(){
  $('input[type="checkbox"]').change(function(evt){
    var tarefa = $(this).closest('div.tarefa');
    var idTarefa = $(tarefa).data('id-tarefa');
    var pronto = $(this).is(':checked');

    $.ajax({
      method: 'PUT',
      url: '/tarefas/' + idTarefa,
      data: {
        realizada: pronto
      }
    });
  });
});
