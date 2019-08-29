import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'app-prediction-add',
  templateUrl: './prediction-add.component.html',
  styleUrls: ['./prediction-add.component.scss'],
})
export class PredictionAddComponent implements OnInit {
  @Input() gameId: number;
  @Input() userId: number;
  @Input() playerHomeId: number;
  @Input() playerAwayId: number;
  @Input() playerHomeScore: number;
  @Input() playerAwayScore: number;
  @Input() predId: number;

  predictionForm: FormGroup;
  message: string;
  editMode = false;

  constructor(private store: Store<fromStore.GameState>) {}

  ngOnInit() {
    this.predId != null && (this.editMode = true);
    this.buildForm(this.predId, this.playerHomeScore, this.playerAwayScore);
  }

  onSubmit() {
    const form = this.predictionForm;
    const newPrediction = form.value;

    // Set scores
    this.playerHomeScore = form.value.homeScore;
    this.playerAwayScore = form.value.awayScore;

    // Set other values
    newPrediction.gameId = this.gameId;
    newPrediction.userId = this.userId;
    newPrediction.playerHomeId = this.playerHomeId;
    newPrediction.playerAwayId = this.playerAwayId;

    // Add new / update prediction
    if (this.editMode) {
      newPrediction.id = this.predId;
      this.store.dispatch(new fromStore.UpdatePrediction(newPrediction));
    } else {
      this.store.dispatch(new fromStore.AddPrediction(newPrediction));
      this.editMode = true;
    }
  }

  private buildForm(id: number, homeScore: number, awayScore: number) {
    this.predictionForm = new FormGroup({
      id: new FormControl(id),
      homeScore: new FormControl(homeScore),
      awayScore: new FormControl(awayScore),
    });
  }
}
