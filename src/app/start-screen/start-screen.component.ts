import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, doc, docData, addDoc } from '@angular/fire/firestore';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: Firestore, private router: Router) {

  }

  ngOnInit(): void {

  }

  newGame() {
    // Start Game
    let game = new GameDataService();
    const coll = collection(this.firestore, 'games');
    
    // Add document to Firestore collection
    addDoc(coll, { game: game.toJson() })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        // Optionally, you can do more operations with the docRef here if needed
        this.router.navigateByUrl('/game/' + docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        // Handle error appropriately
      });
  }

}
