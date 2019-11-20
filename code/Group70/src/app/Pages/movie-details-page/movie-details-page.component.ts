import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class MovieDetailsPageComponent implements OnInit {


  reviewForm = new FormGroup({
    title : new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z\\s]+")]),
    comment : new FormControl('',[Validators.required])
  })




  constructor(config: NgbRatingConfig, modalConfig: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;

     // customize default values of modals used by this component tree
     modalConfig.backdrop = 'static';
     modalConfig.keyboard = false;
     modalConfig.backdropClass = "backDrop";
     modalConfig.centered = true;
     modalConfig.size = "lg";
     modalConfig.scrollable = true;
  }


  ngOnInit() {
  }

  // modal
  open(content) {
    this.modalService.open(content);
  }



  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55]}
  ];

  public chartLabels: Array<any> = ['1', '2', '3', '4', '5'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  

}
