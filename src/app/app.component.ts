import { Component } from '@angular/core';
import {Task} from './task/task';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {TaskDialogComponent, TaskDialogResult} from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todo: Task[] = [
    {title: 'Buy milk', desc: 'go to the shop'},
    {title: 'Buy child', desc: 'go to the hospital'},
    {title: 'Buy drinks', desc: 'go to the alcoves'},
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

constructor(private dialog: MatDialog) {}

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  edit(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  }

}
