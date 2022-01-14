# ADISE21_moutzourhs
Χαρτιά - Μουτζούρης
=================
   * [Εγκατάσταση](#εγκατάσταση)
      * [Απαιτήσεις](#απαιτήσεις)
      * [Οδηγίες Εγκατάστασης](#οδηγίες-εγκατάστασης)
   * [Περιγραφή API](#περιγραφή-api)
      * [Methods](#methods)
         * [cards_board](#cards_board)
            * [Ανάγνωση cards_board](#ανάγνωση-cards_board)
            * [Αρχικοποίηση cards_board](#αρχικοποίηση-cards_board)
         * [cards_player](#cards_player)
            * [Ανάγνωση στοιχείων παίκτη](#ανάγνωση-στοιχείων-παίκτη)
            * [Καθορισμός στοιχείων παίκτη](#καθορισμός-στοιχείων-παίκτη)
         * [Status](#status)
              * [Ανάγνωση κατάστασης παιχνιδιού](#ανάγνωση-κατάστασης-παιχνιδιού)
         * [players](#players)         
	      * [Καταχώρηση/Είσοδος στο παιχνίδι](#Καταχώρηση/Είσοδος στο παιχνίδι) 
		 
       * [Entities](#entities)
         * [cards_board](#cards_board-1)
         * [cards_players](#cards_players)
         * [Game_status](#game_status)
         * [players](#players-1)


# Demo Page

Μπορείτε να κατεβάσετε τοπικά ή να επισκευτείτε την σελίδα: 
https://users.iee.ihu.gr/~it144343/adise21/account_acc.php



# Εγκατάσταση

## Απαιτήσεις

* Apache2
* Mysql Server
* php

## Οδηγίες Εγκατάστασης

 * Κάντε clone το project σε κάποιον φάκελο <br/>
  `$ git clone https://github.com/iee-ihu-gr-course1941/ADISE21_moutzourhs.git`

 * Βεβαιωθείτε ότι ο φάκελος είναι προσβάσιμος από τον Apache Server. πιθανόν να χρειαστεί να καθορίσετε τις παρακάτω ρυθμίσεις.

 * Θα πρέπει να δημιουργήσετε στην Mysql την βάση με όνομα 'adise21' και να φορτώσετε σε αυτήν την βάση τα δεδομένα από το αρχείο schema.sql

 * Θα πρέπει να φτιάξετε το αρχείο lib/info.php το οποίο να περιέχει:
```
    <?php
	$DB_PASS = 'κωδικός';
	$DB_USER = 'όνομα χρήστη';
    ?>
```

# Περιγραφή Παιχνιδιού

Ο μουτζούρης παίζεται ως εξής:
Αφού ανακατέψουμε καλά, μοιράζουμε όλη την τράπουλα στους παίχτες έτσι ώστε όλοι να έχουν των ίδιο αριθμό φύλλων (ή + - 1).
Κάθε παίχτης αφαιρεί από τα φύλλα που έχει στα χέρια του τα ζευγάρια, δηλαδή, 2 Άσσους 2 δυάρια 2 τριάρια κ.τ.λ.
Τα υπόλοιπα τα κρατάμε στο χέρι σαν βεντάλια έτσι ώστε να μπορεί ο άλλος παίχτης να διαλέξει, χωρίς να τα βλέπει,
ένα από αυτά. Ο πρώτος παίχτης τραβάει ένα φύλλο από αυτόν που κάθετε στα αριστερά του, αν κάνει ζευγάρι το νέο χαρτί με κάποια από τα δικά του τότε τα ρίχνει,
αλλιώς τα κρατάει και συνεχίζει ο επομένως που είναι στα δεξιά του. Όποιος ζευγαρώσει όλα τα φύλλα του βγαίνει από το παιχνίδι. 
Όποιος μείνει τελευταίος με τον Ρήγα Μπαστούνι (τον Μουτζούρη) στο χέρι του είναι ο χαμένος, και οι υπόλοιποι παίχτες αποφασίζουν την ποινή του.

Οι κανόνες είναι οι:
Πριν ξεκινήσετε αφαιρείτε από την τράπουλα όλες τις φιγούρες  και κρατάτε μόνο τον Ρήγα Μπαστούνι.

Η βάση μας κρατάει τους εξής πίνακες και στοιχεία:cards_board,cards_board_empty,cards_players,game_status,players που θα τους δούμε αναλυτικότερα παρακάτω.

Η εφαρμογή απαπτύχθηκε μέχρι το σημείο που κάνει suffle της κάρτες δίνει ο παίχτης ένα όνομα το οποίο είναι και ο μοναδικός κωδικός τοκέν στο παιχνίδι μας
και διαλέγει ο παίχτης σε ποιά μεριά θα παίξει. Game status ενημερώνεται αυτόματα ανάλογα με της κινήσεις του παίχτη και όλα τα στοιχεία του πίνακα τα παίρνουμε
απο την βάση μας με όνομα table cards_board.


## Συντελεστές

Περιγράψτε τις αρμοδιότητες της ομάδας.

Προγραμματιστής 1: Jquery

Προγραμματιστής 2: PHP API

Προγραμματιστής 3: Σχεδιασμός mysql

....


# Περιγραφή API

## Methods


### cards_board
#### Ανάγνωση cards_board

```
GET /board/
```

Επιστρέφει το [cards_board](#cards_board).

#### Αρχικοποίηση cards_board
```
POST /board/
```

Αρχικοποιεί το Board, δηλαδή το παιχνίδι. Γίνονται reset τα πάντα σε σχέση με το παιχνίδι.
Επιστρέφει το [cards_board](#cards_board).



### cards_player

#### Ανάγνωση στοιχείων παίκτη
```
GET /players/:p
```

Επιστρέφει τα στοιχεία του παίκτη p ή όλων των παικτών αν παραληφθεί. Το p μπορεί να είναι 'T' ή 'D'.

#### Καθορισμός στοιχείων παίκτη
```
PUT /players/:p
```
Json Data:

| Field             | Description                 | Required   |
| ----------------- | --------------------------- | ---------- |
| `username`        | Το username για τον παίκτη p. | yes      |
| `piece_color`     | To μέρος που επέλεξε ο παίκτης p. | yes  |


Επιστρέφει τα στοιχεία του παίκτη p και ένα token. Το token πρέπει να το χρησιμοποιεί ο παίκτης καθόλη τη διάρκεια του παιχνιδιού.

### Status

#### Ανάγνωση κατάστασης παιχνιδιού
```
GET /status/
```

Επιστρέφει το στοιχείο [Game_status](#Game_status).


### players

#### Καταχώρηση/Είσοδος στο παιχνίδι
```
insert /idplayers/firstname/lastname/email/username/password
```

## Entities


### cards_board
---------

Το cards_board είναι ένας πίνακας, ο οποίος στο κάθε στοιχείο έχει τα παρακάτω:


| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `x`                      | H συντεταγμένη x του τετραγώνου              | 0..20                               |
| `y`                      | H συντεταγμένη y του τετραγώνου              | 1 ή 3                               |
| `z`                      | Η συντεταγμένη z του τετραγώνου              | 2                                   | 
| `b_color`                | To χρώμα του τετραγώνου                      | 'T','D'                             |
| `piece_color`            | To χρώμα του πιονιού                         | 'T','D', null                       |
| `piece`                  | To Πιόνι που υπάρχει στο τετράγωνο           |'1','2','3','4','5','6','7','8', '9',| 
|                          |                                               |'10', '11', '12', '13', '14', '15', |
|                          |                                                |'16', '17', '18', '19', '20', '21',|
|                          |                                                |'22', '23', '24', '25', '26', '27',|
|                          |                                                |'28', '29', '30', '31', '32', '33',|
|                          |                                                |'34', '35', '36', '37', '38', '39',|
|                          |                                                |'40', '41, null       		|
| `moves`                  | Πίνακας με τα δυνατά τετράγωνα (x,y) που μπορεί να μετακινηθεί το τρέχον πιόνι. Αν δεν υπάρχει πιόνι, ή δεν έχει κάνει login ο χρήστης, ή δεν έχει ξεκινήσει το παιχνίδι ή αν δεν υπάρχουν κινήσεις, τότε το πεδίο δεν υπάρχει. |   |


### cards_players
---------

O κάθε παίκτης έχει τα παρακάτω στοιχεία:


| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `username`               | Όνομα παίκτη                                 | String                              |
| `piece_color`            | Οι μεριά που παίζει ο παίκτης                | 'T','D'                             |
| `token  `                | To κρυφό token του παίκτη. Επιστρέφεται μόνο τη στιγμή της εισόδου του παίκτη στο παιχνίδι | HEX |
| `last_action`            | Ενημερώνει την ώρα και την ημέρα που εκανε την τελευταία κίνηση ο παίχτης          |


### Game_status
---------

H κατάσταση παιχνιδιού έχει τα παρακάτω στοιχεία:


| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `status  `               | Κατάσταση             | 'not active', 'initialized', 'started', 'ended', 'aborded'     |
| `p_turn`                 | To χρώμα του παίκτη που παίζει        | 'Τ','D',null                              |
| `result`                 |  To χρώμα του παίκτη που κέρδισε |'T','D',null                              |
| `last_change`            | Τελευταία αλλαγή/ενέργεια στην κατάσταση του παιχνιδιού         | timestamp |

### players
----------

Τα στοιχεία του παίχτη είναι:

| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `idplayers `             | Πόσοι παίχτες έχουν γίνει member στην ιστοσελιδα μας              | auto increment |
| `firstname`              | Το όνομα του παίχτη        		      | varchar                         |
| `lastname`               | Το επίθετο του παίχτη      		 | varchar                              |
| `email`            	   | Το email του παίχτη  						    | timestamp |
| `username `              | Το username που θα χρησιμοποιή και στην είσοδο στην ιστοσελίδα        | varchar    |
| `password`               | Το password που θα χρειάζεται για να εισέλθει       | password (md5)               |
