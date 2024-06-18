import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, PlayerMobileComponent, GameInfoComponent, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  gameData = inject(GameDataService);
  game: GameDataService;
  firestore: Firestore;
  gameId: string = '';
  gameOver = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, firestore: Firestore) {
    this.game = new GameDataService();
    this.firestore = firestore;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('Parameter ', params['id']);
      this.gameId = params['id'];
      const gameDocRef = doc(this.firestore, `games/${this.gameId}`);
      docData(gameDocRef).subscribe((doc: any) => {
        console.log('Game update', doc);
        if (doc && doc.game) {
          this.updateGameFromFirestore(doc.game);
        } else {
          console.error('No game data found for this document.');
        }
      });
    });
  }

  updateGameFromFirestore(gameData: any): void {
    this.game.currentPlayer = gameData.currentPlayer;
    this.game.playedCards = gameData.playedCards || [];
    this.game.players = gameData.players || [];
    this.game.stack = gameData.stack || [];
    this.game.pickCardAnimation = gameData.pickCardAnimation;
    this.game.currentCard = gameData.currentCard;


    console.log('Updated game:', this.game);
  }

  newGame() {
    this.game = new GameDataService();

  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      const card = this.game.stack.pop();

      this.game.currentCard = card !== undefined ? card : 'No more cards available';

      this.game.pickCardAnimation = true;

      console.log('New Card:', this.game.currentCard);
      console.log('Game is', this.game);


      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);

        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    const gameDocRef = doc(this.firestore, `games/${this.gameId}`);
    updateDoc(gameDocRef, { game: this.game.toJson() })
      .then(() => {
        console.log('Game successfully updated in Firestore');
      })
      .catch(error => {
        console.error('Error updating game:', error);
      });
  }

}
