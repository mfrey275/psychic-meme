PennController.ResetPrefix(null) // Shorten command names (keep this line here)

DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// Show the consent first, then intro page with instructions, then practice trials
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'
Sequence( "consent" , "intro" , "load" ,"practice1" , "practice2" , "practice3" , rshuffle( randomize( "trial-experiment" ) , randomize( "trial-fillers" ) ) , SendResults() , "end" )

CheckPreloaded(
    startsWith("practice")
    ,
    startsWith("trial")
    ,
    "exitItem")
    .label("load");
// Showing consent, stored in a html file
newTrial( "consent" ,
    defaultText
        .print()
    ,
    newHtml( "consent", "consent.html" )
        .print()
    ,
    newButton("<p>I consent to participate in this study and I agree to continue.")
        .center()
        .print()
        .wait()
)

//Intro with instructions from html file
newTrial( "intro" ,
    newHtml("intro.html")
        .print()
    ,
    newTextInput()
        .print()
        .log()
        .wait()
    ,
    newButton("Continue.")
        //.center()
        .print() //"center at 50vw","bottom at 40em"
        .wait()
)

//trial in which both head noun and modifier match
newTrial( "practice1" ,
    fullscreen()
    ,
    newText( "trial" , "This is a practice trial" ).center().print()
    ,
    newTimer( 1000 ).start().wait()
    ,
    getText( "trial" ).remove()
    ,
    defaultImage.size( 200 , 200 ) //All images are size 200px * 200px
    ,
    newCanvas( "trial1" , 450 , 450 )
        .color( "white" )
        .add( 0 , 0 , newImage("1", "red_triangle.png" ) ) 
        .add( 250 , 0 , newImage( "2" , "red_square.png" ) )
        .add( 0 , 250 , newImage( "3" , "green_circle.png" ) )
        .add( 250 , 250 , newImage( "4" , "blue_octagon.png" ).css( "border" , "solid 2px red" ) )
        .center()
        .print()
    ,
    newText( "word" , "<b>This is the blue octagon.</b>" )
        .center()
        .print( "center at 50vw","top at 9em" )
    ,
    newController( Question , { q: "Rate how well the sentence fits the context.", 
    as: ["1", "2", "3", "4", "5","6","7"] ,
    presentAsScale: "true" , 
    leftComment: "(doesn't fit at all)" ,
    rightComment: "(fits perfectly)" } )        
        .center()
        .print()
        .log()
        .wait()
        .remove()
    ,
    getCanvas( "trial1" ).remove()
    ,
    getText( "word" ).remove()
    ,
    newButton( "Next" )
        .print( "center at 50vw","top at 15em" )
        .wait()
)

//trial in which head noun matches, modifier does not
newTrial( "practice2" ,
    newText( "trial" , "This is a practice trial" ).center().print()
    ,
    newTimer( 1000 ).start().wait()
    ,
    getText( "trial" ).remove()
    ,
    defaultImage.size( 200 , 200 ) //All images are size 200px * 200px
    ,
    newCanvas( "trial2" , 450 , 450 )
        .color( "white" )
        .add( 0 , 0 , newImage("1", "blue_octagon.png" ) ) 
        .add( 250 , 0 , newImage( "2" , "red_triangle.png" ).css( "border" , "solid 2px red" ) )
        .add( 0 , 250 , newImage( "3" , "red_square.png" ) )
        .add( 250 , 250 , newImage( "4" , "green_circle.png" ) )
        .center()
        .print()
    ,
    newText( "word" , "<b>This is the red shape.</b>" )
        .center()
        .print( "center at 50vw","top at 9em" )
    ,
    newController( Question , { q: "Rate how well the sentence fits the context.", 
    as: ["1", "2", "3", "4", "5","6","7"] ,
    presentAsScale: "true" , 
    leftComment: "(doesn't fit at all)" ,
    rightComment: "(fits perfectly)" } )        
        .center()
        .print()
        .log()
        .wait()
        .remove()
    ,
    getCanvas( "trial2" ).remove()
    ,
    getText( "word" ).remove()
    ,
    newButton( "Next" )
        .print( "center at 50vw","top at 15em" )
        .wait()
)

//final trial-- modifier matches, head noun does not
newTrial( "practice3" ,
    newText( "trial" , "This is a practice trial" ).center().print()
    ,
    newTimer( 1000 ).start().wait()
    ,
    getText( "trial" ).remove()
    ,
    defaultImage.size( 200 , 200 ) //All images are size 200px * 200px
    ,
    newCanvas( "trial3" , 450 , 450 )
        .color( "white" )
        .add( 0 , 0 , newImage("1", "red_triangle.png" ) ) 
        .add( 250 , 0 , newImage( "2" , "blue_octagon.png" ) )
        .add( 0 , 250 , newImage( "3" , "green_circle.png" ).css( "border" , "solid 2px red" ) )
        .add( 250 , 250 , newImage( "4" , "red_square.png" ) )
        .center()
        .print()
    ,
    newText( "word" , "<b>This is the red circle.</b>" )
        .center()
        .print( "center at 50vw","top at 9em" )
    ,
    newController( Question , { q: "Rate how well the sentence fits the context.", 
    as: ["1", "2", "3", "4", "5","6","7"] , 
    presentAsScale: "true",
    leftComment: "(doesn't fit at all)" ,
    rightComment: "(fits perfectly)" } )        
        .center()
        .print()
        .log()
        .wait()
        .remove()
    ,
    getCanvas( "trial3" ).remove()
    ,
    getText( "word" ).remove()
    ,
    newButton( "Proceed to Experiment" )
        .print( "center at 50vw","top at 12em" )
        .wait()
)

Template( "stimuli.csv" , 
    //Row will iteratively point to every row in stimuli.csv
    row => newTrial( "trial-experiment" ,
        fullscreen()
        ,
        defaultImage.size( 200 , 200 ) //All images are size 200px * 200px
        ,
        newCanvas( "images" , 450 , 450 ) //Canvas size is 500px * 500px
            .color( "white" )             //Use a white background
            .add( 0 , 0, newImage( "target" , row.image1 ).css( "border" , "solid 2px red" ) )
            .add( 250 , 0 , newImage( "2" , row.image2 ) )
            .add( 0 , 250 , newImage( "3" , row.image3 ) )
            .add( 250 , 250 , newImage( "4" , row.image4 ) )
            .center()
            .print()
        ,
        newSelector()
            .add( getImage( "target" ) , getImage( "2" ) , getImage( "3" ) , getImage( "4" ) )
            .shuffle()
        ,
        newText( "prompt" , row.instruction )
            .center()
            .bold()
            .print( "center at 50vw","top at 9em" )
        ,
        newController( Question , { q: "Rate how well the sentence fits the context.", 
        as: ["1", "2", "3", "4", "5","6","7"] , 
        presentAsScale: "true",
        leftComment: "(doesn't fit at all)" ,
        rightComment: "(fits perfectly)" } )        
            .center()
            .print()
            .log()
            .wait()
            .remove()
        ,
        getCanvas( "images" ).remove()
        ,
        getText( "prompt" ).remove()
        ,
        newButton( "Next" )
            .print( "center at 50vw","top at 15em" )
            .wait()
    )
    //Log all columns from spreadsheet per trial. add canvas images too
    .log( "Adjective" , row.adjective )
    .log( "Comparison" , row.cc )
    .log( "Set" , row.set_ID )
    .log( "Group" , row.group )
    .log( "Highlighted" , row.image1 )
    .log( "Image2" , row.image2 )
    .log( "Image3" , row.image3 )
    .log( "Image4" , row.image4 )
)

Template( "filler.csv" ,
    row => newTrial( "trial-fillers" ,
        fullscreen()
        ,
        defaultImage.size( 200 , 200 ) //All images are size 200px * 200px
        ,
        newCanvas( "images" , 450 , 450 ) //Canvas size is 500px * 500px
            .color( "white" )             //Use a white background
            .add( 0 , 0, newImage( "expected" , row.image1 ).css( "border" , "solid 2px red" ) )
            .add( 250 , 0 , newImage( "2" , row.image2 ) )
            .add( 0 , 250 , newImage( "3" , row.image3 ) )
            .add( 250 , 250 , newImage( "4" , row.image4 ) )
            .center()
            .print()
        ,
        newSelector()
            .add( getImage( "expected" ) , getImage( "2" ) , getImage( "3" ) , getImage( "4" ) )
            .shuffle()
        ,
        newText( "prompt" , row.phrase )
            .center()
            .bold()
            .print( "center at 50vw","top at 9em" )
        ,
        newController( Question , { q: "Rate how well the sentence fits the context.", 
        as: ["1", "2", "3", "4", "5","6","7"] , 
        presentAsScale: "true",
        leftComment: "(doesn't fit at all)" ,
        rightComment: "(fits perfectly)" } )        
            .center()
            .print()
            .log()
            .wait()
            .remove()
        ,
        getCanvas( "images" ).remove()
        ,
        getText( "prompt" ).remove()
        ,
        newButton( "Next" )
            .print( "center at 50vw","top at 15em" )
            .wait()
    )
    .log( "Highlighted" , row.image1 )
    .log( "Image2" , row.image2 )
    .log( "Image3" , row.image3 )
    .log( "Image4" , row.image4 )
    .log( "Type" , row.type )
)

//The end of the experiment
newTrial( "end" ,
    exitFullscreen()
    ,
    newText( "Thank you for your participation!" )
        .center()
        .print()
    ,
    //Put validation link here for participants to click on
    newText( "<p><a href='https://app.prolific.co/submissions/complete?cc=CPKC2CLO' target='_blank'>Click here to validate your submission</a></p>" )
        .center()
        .print()
    ,
    //Wait on this page forever
    newButton().wait()
)
// Make sure the progress bar is full upon reaching this last (non-)trial
.setOption( "countsForProgressBar" , false )

