import { Component, OnInit } from "@angular/core";

/**
 * Component about us information
 */
@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  /**to store video url */
  video1: any;

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor() { }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    window.scrollTo(0, 0);
    this.video1 = document.createElement("video");
  }
/**
 * Function for play video
 */
  playvideo() {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = <any>canvas.getContext("2d");
    var stopVideo = <any>document.getElementById("stopVideo");
    var video = this.video1;
    
    video.setAttribute(
      "src",
      "./../../../assets/img/fightMyHeroVideo.mp4"
    );
    
    video.play();
    (function loop() {
      if (!video.paused && !video.ended) {
        //We drow the video img
        ctx.drawImage(video, 0, 0);
        // time to draw the frame of the video
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
    })();

    stopVideo.addEventListener("click", function () {
      video.pause();
    });
  }

  /**When the componet is destroy clean the element  */
  ngOnDestroy() {
    var video = this.video1;
    video.pause();
  }
}
