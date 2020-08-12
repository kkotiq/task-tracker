 $(document).ready(function(){
   $('.add-task-button').on('click', function(event){
     event.preventDefault();
   });

   function initialState() {
     if (localStorage.getItem('task') === null) {
       $('.empty-list').show();
     }
     else {
       $('.empty-list').hide();
       $('.todo-list').html(localStorage.getItem('task'));
     }
   };

   initialState();

   function addToStorage() {
     let content = $('.todo-list').html();
     localStorage.setItem('task', content);
   };

   function deleteTask(item) {
     item.remove();
     let items = $('.task');
     addToStorage();
     if (items.length == 0) {
       $('.empty-list').show();
       localStorage.removeItem('task');
     };
   };

   function addTask() {
    let taskName = $('.task-name').val();
    let taskDesc = $('.task-description').val();
    if (taskName.length !== 0 && taskDesc.length !== 0) {
      $('.task-name').removeClass('error');
      $('.task-description').removeClass('error')
      $('.empty-list').hide();
      $('.todo-list').append(`
      <li class="task">
      <div class="task-head">
        <h3>${taskName}</h3>
        <div class="task-head__props">
          <button class="clear"></button>
          <button class="show-full"></button>
        </div>
      </div>
      <div class="task-details">
        <span class="description">${taskDesc}</span>
      </div>
     </li>`)
      // setTimeout(function(){
      //   $('.task').removeClass('hidden')
      // }, 50);
      taskName = $('.task-name').val('');
      taskDesc = $('.task-description').val('');
      addToStorage();
    }
    else {
      $('.task-name').addClass('error');
      $('.task-description').addClass('error')
    }
   }

   $('.add-task-button').on('click', addTask);
   $('body').on('click', '.clear', function(event){
     event.preventDefault();
     let item = $(this).parents('.task');
     deleteTask(item);
   });

   $('body').on('click','.show-full', function(event){
     event.preventDefault();
     $(this).toggleClass('turn');
     $(this).parents('.task').find('.task-details').toggleClass('closed');
   });
 });
