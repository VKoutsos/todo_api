import { Component } from '@angular/core';
import { LogService} from '../../services/log.service';
import { OnInit } from '@angular/core';
import { Log } from '../../models/log.model';

@Component({
  selector: 'app-logs',
  standalone: false,
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit{
  logs:Log[]=[];
  displayedColumns:string[]=['id','action','timestamp'];

  constructor(private logService: LogService) { }

  ngOnInit():void{
    this.logService.getUserLogs().subscribe({
      next:(logs)=>this.logs=logs,
      error:(err)=>console.error('Error fetching logs:',err)
    });
  }
}
