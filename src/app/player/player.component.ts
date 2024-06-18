import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name: string = "";
  @Input() playerActive: boolean = false;
  profileImage: string = "";

  private profileImages: string[] = [
    './../../assets/img/profile/profile_1.png',
    './../../assets/img/profile/profile_2.png',
    './../../assets/img/profile/profile_3.png',
    './../../assets/img/profile/profile_4.png',
    './../../assets/img/profile/profile_5.png',
  ];

  ngOnInit() {
    this.profileImage = this.getRandomProfileImage();
  }

  getRandomProfileImage(): string {
    const randomIndex = Math.floor(Math.random() * this.profileImages.length);
    return this.profileImages[randomIndex];
  }
}
