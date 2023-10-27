"use client"
import * as Dialog from "@radix-ui/react-dialog";
import { CaretDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

function Page() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isEditingDialogOpen, setIsEditingDialogOpen] = useState(false);

  const elimTask = (taskId) => {
    setEditingTaskId(taskId);
    setIsEditingDialogOpen(true);
  };
  function eliminarTareaPorId(id) {
    // Obtener los datos actuales del LocalStorage
    const datosGuardados = localStorage.getItem("Task");
    if (datosGuardados) {
      let tareas = JSON.parse(datosGuardados);
  
      // Filtrar las tareas para eliminar la que coincide con el ID
      tareas = tareas.filter((tarea) => tarea.id !== id);
  
      // Guardar los datos actualizados en el LocalStorage
      localStorage.setItem("Task", JSON.stringify(tareas));
  
      // Devolver las tareas actualizadas
      return tareas;
    } else {
      // Si no hay datos en el LocalStorage, simplemente devuelve un arreglo vacío
      return [];
    }
  }
  
  
  const saveEditedTask = () => {
    const updatedTasks = [...tasks];
    const taskToEdit = updatedTasks.find((task) => task.id === editingTaskId);
    taskToEdit.name = document.getElementById("nameM").value;
    taskToEdit.titulo = document.getElementById("tittleM").value;
    taskToEdit.contenido = document.getElementById("contentM").value;

    // Elimina los datos anteriores del LocalStorage
    localStorage.removeItem("Task");

    // Guarda los nuevos datos actualizados en el LocalStorage
    localStorage.setItem("Task", JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
    setIsEditingDialogOpen(false);
  };

  const cargarTareasDesdeLocalStorage = () => {
    const datosGuardados = localStorage.getItem("Task");
    if (datosGuardados) {
      const tareas = JSON.parse(datosGuardados);
      setTasks(tareas);
    }
  };

  useEffect(() => {
    cargarTareasDesdeLocalStorage();
  }, []);

  const setsTask = () => {
    const name = document.getElementById("name").value;
    const tittle = document.getElementById("tittle").value;
    const content = document.getElementById("content").value;

    // Obtiene los datos actuales del LocalStorage
    const datosGuardados = localStorage.getItem("Task");
    let tasks = [];

    if (datosGuardados) {
      tasks = JSON.parse(datosGuardados);
    }

    const nuevoElemento = {
      id: tasks.length + 1,
      name: name,
      titulo: tittle,
      hora: "11:00 AM",
      contenido: content,
    };

    tasks.push(nuevoElemento);

    // Elimina los datos anteriores del LocalStorage
    localStorage.removeItem("Task");

    // Guarda los nuevos datos actualizados en el LocalStorage
    localStorage.setItem("Task", JSON.stringify(tasks));

    setTasks(tasks);
  };

  const setValue = () => {
    setsTask();
  };


  const elimValue = () => {
// Ejemplo de cómo usar la función para eliminar una tarea por su ID
const idAEliminar = parseInt(document.getElementById("task-select").value, 10);
console.log(idAEliminar);

const tareasActualizadas = eliminarTareaPorId(idAEliminar);

console.log("Tareas actualizadas después de eliminar:", tareasActualizadas);
  }
  return (
    <>
      <div className="flex justify-center mt-10 mb-10 items-center flex-col gap-8">
        <Text size="7" className="font-bold">
          Create your Tasks
        </Text>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-xl focus:outline-none">
              Create Task
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Create Task
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                Make changes to your Task here. Click save when you&apos;re done.
              </Dialog.Description>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-violet11 w-[90px] text-right text-[15px]"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="name"
                  defaultValue=""
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-violet11 w-[90px] text-right text-[15px]"
                  htmlFor="tittle"
                >
                  Tittle
                </label>
                <input
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="tittle"
                  defaultValue=""
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-violet11 w-[90px] text-right text-[15px]"
                  htmlFor="content"
                >
                  Content
                </label>
                <input
                  className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="content"
                  defaultValue=""
                />
              </fieldset>
              <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                  <button
                    onClick={setValue}
                    className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                  >
                    Save changes
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover-bg-violet4 focus-shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus-shadow-[0_0_0_2px] focus-outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div>
          <Button onClick={elimValue} id="eliminar-button" color="amber">
            Eliminate
          </Button>

          <select
            name="task"
            id="task-select"
            className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.titulo}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section className="flex flex-row gap-5 justify-center">
        {tasks.map((task) => (
          <div
            className="flex flex-col justify-start w-60 border-2 rounded-lg border-gray-600 drop-shadow-xl gap-5"
            key={task.id}
            id="idTask"
          >
            <p className="hidden">{task.id}</p>
            <Text>Tittle: {task.titulo}</Text>
            <Text>Name: {task.name}</Text>
            <Text>Fecha: {task.hora}</Text>
            <div className="flex flex-row justify-center">
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button color="blue" onClick={() => elimTask(task.id)}  className="bg-blue-500">
                    Edit
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                  <AlertDialog.Title>{task.titulo}</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className="text-violet11 w-[90px] text-right text-[15px]"
                        htmlFor="nameM"
                      >
                        Name
                      </label>
                      <input
                        className="text-violet11 shadow-violet7 focus-shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus-shadow-[0_0_0_2px]"
                        id="nameM"
                        defaultValue={task.name}
                      />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className="text-violet11 w-[90px] text-right text-[15px]"
                        htmlFor="tittleM"
                      >
                        Tittle
                      </label>
                      <input
                        className="text-violet11 shadow-violet7 focus-shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus-shadow-[0_0_0_2px]"
                        id="tittleM"
                        defaultValue={task.titulo}
                      />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className="text-violet11 w-[90px] text-right text-[15px]"
                        htmlFor="contentM"
                      >
                        Content
                      </label>
                      <input
                        className="text-violet11 shadow-violet7 focus-shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus-shadow-[0_0_0_2px]"
                        id="contentM"
                        defaultValue={task.contenido}
                      />
                    </fieldset>
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray" onClick={saveEditedTask}>
                        Save
                      </Button>
                    </AlertDialog.Cancel>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button color="blue" className="bg-blue-500">View</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                  <AlertDialog.Title>{task.titulo}</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    {task.contenido}
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Salir
                      </Button>
                    </AlertDialog.Cancel>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Page;
