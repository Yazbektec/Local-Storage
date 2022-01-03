var app = new function () {
  this.el = document.getElementById('tasks');

  this.tasks = [];
  this.FetchAll = function () {
    var data = '';

    if (this.tasks.length > 0) {
      for (i = 0; i < this.tasks.length; i++) {
        data += '<tr>';
        data += '<td>' + (i + 1) + ". " + this.tasks[i] + '</td>';
        data += '<td><button onclick="app.Editar(' + i + ')"  class="btn btn-warning">Editar</button></td>';
        data += '<td><button onclick="app.Borrar(' + i + ')"  class="btn btn-danger">Borrar</button></td>';
        data += '</tr>';
      }
    }

    this.Count(this.tasks.length);
    return this.el.innerHTML = data;
  };

  this.Add = function () {
    el = document.getElementById('add-todo');

    var task = el.value;

    if (task) {
      this.tasks.push(task.trim());
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      el.value = '';

      this.FetchAll();
    }
  };


  this.Editar = function (item) {
    var el = document.getElementById('edit-todo');

    el.value = this.tasks[item];

    document.getElementById('edit-box').style.display = 'block';
    self = this;

    document.getElementById('save-edit').onsubmit = function () {

      var task = el.value;

      if (task) {

        self.tasks.splice(item, 1, task.trim());
        localStorage.setItem('tasks', JSON.stringify(self.tasks));
        self.FetchAll();

        CloseInput();
      }
    }
  };

  this.Borrar = function (item) {

    this.tasks.splice(item, 1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.FetchAll();
  };

  this.Count = function (data) {
    var el = document.getElementById('counter');
    var name = 'Tareas';

    if (data) {
      if (data == 1) {
        name = 'Tarea'
      }
      el.innerHTML = data + ' ' + name;
    }
    else {
      el.innerHTML = 'Sin ' + name;
    }
  }; 
  this.storage = function(){ 
    var Local = JSON.parse(localStorage.getItem('tasks')); 
    if(Local !==null){ console.log("done"); 
    this.tasks = Local; 
    console.log(this.tasks); 
    this.FertchAll(); 
  } 
}; 
this.storage();
}
app.FetchAll();

function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}