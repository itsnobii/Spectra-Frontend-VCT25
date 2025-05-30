import { Component, Input, OnInit } from "@angular/core";
import { Config } from "../../shared/config";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-topinfo",
  templateUrl: "./topinfo.component.html",
  styleUrls: ["./topinfo.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [style({ opacity: 0 }), animate("1s", style({ opacity: 1 }))]),
      transition(":leave", [animate("1s", style({ opacity: 0 }))]),
    ]),
  ],
})
export class TopinfoComponent implements OnInit {
  @Input() match!: any;

  sponsorsAvailable = false;
  sponsorImages: string[] = [];
  currentSponsorIndex = 0;
  showEventName!: boolean;
  eventName!: string;

  constructor(private config: Config) {}

  ngOnInit() {
    this.showEventName = this.config.showEventName;
    this.eventName = this.config.eventName;
    this.sponsorsAvailable = this.config.sponsorImageUrls.length > 0;
    if (this.sponsorsAvailable) {
      this.sponsorImages = this.config.sponsorImageUrls;
      this.currentSponsorIndex = 0;
      if (this.config.sponsorImageUrls.length > 1) {
        setInterval(() => this.nextSponsor(), this.config.sponsorImageRotateSpeed);
      }
    }
  }

  nextSponsor() {
    this.currentSponsorIndex = (this.currentSponsorIndex + 1) % this.config.sponsorImageUrls.length;
  }

  mapInfoForSlot(slot: number) {
    // Return the mapinfo object for this slot, or a default if not available
    return this.match.tools.seriesInfo.mapInfo[slot] || {};
  }

  isDeciderForSlot(slot: number) {
    // Your logic for decider, if needed
    return false;
  }
}
