    var selectedWord = ""; 
    var selectedHint = ""; 
    var board = ""; 
    
    var remainingGuesses = 6; 
    var words = ["snake", "csumb", "beetle", ]; 
    var words1 = ["scary" , "college's name" ,"Beat All"];
    
    console.log(words[0]); 
    
    window.onload = startGame; 
    
    
    
    function pickWord() {
        var randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex].toUpperCase();
        selectedHint = words1[randomIndex];
    }
     
    

    function initBoard() {
        for (var letter in selectedWord) {
            board += '_';  
        }
        
    

    }
    
    function startGame() {
        pickWord(); 
        initBoard(); 
        updateBoard(); 
        generateLetters(); 
        
       $('.replayBtn').on("click", function() {
         location.reload();  
       }); 
       
       $('.hint').on("click", function(){
            $("#Hint").append(selectedHint)
       })
       
      
       
    }
    
    
        
    function updateBoard() {
        $("#word").html(""); 
        
        for (var letter of board) {
            //document.getElementById("word").innerHTML += letter + " "; 
            $("#word").append(letter + " "); 
        }
    }
    
    
    
    function generateLetters() {
        
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        
        for (var letter of alphabet) {
            $('#letters').append("<button class='letter-btn' id='" + letter + "'>" + letter + "</button>");
        }
        
        $('.letter-btn').click(function(){
            checkLetter($(this).attr("id"))
        })
        
        

    }
    
    
    function checkLetter(letter)  {
        var positions = []; 
        
        for (var i = 0; i < selectedWord.length; i++) {
            if (letter == selectedWord[i]) {
                positions.push(i); 
            }
        }
        
        
        if (positions.length > 0) {
            // User typed in a correct letter
            // show the letters at these positions
            updateWord(positions, letter); 
            
            if (!board.includes('_')) {
                endGame(true); 
            }
            
        } else {
            remainingGuesses--;
            console.log("User guessed wrong.  Remaining guesses: " + remainingGuesses); 
            updateMan(); 
            
            if (remainingGuesses == 0) {
                endGame(false); 
            }
            
        }
    }
    
    
    function endGame(win) {
        $('#letters').hide(); 
        
        if (win) {
            $('#won').show(); 
        } else {
            $('#lost').show(); 
        }
    }
    
    function updateMan() {
        var imgIndex = 6 - remainingGuesses; 
        var imgURL = "./img/stick_" + imgIndex + ".png"; 
        console.log(imgURL); 
        $('#hangImg').attr('src', imgURL); 
    } 
    
    function updateWord(positions, letter) {
        for (var pos of positions) {
            board = replaceAt(board, pos, letter); 
        }
        
        updateBoard(); 
    }
    
    function replaceAt(str, index, value) {
        return str.substr(0, index) + value + str.substr(index + value.length); 
    }
    
    