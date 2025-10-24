var randNumber1=Math.floor(Math.random()*6)+1;
var randNumber2=Math.floor(Math.random()*6)+1;
var randomDiceImage1="dice"+randNumber1+".png";
var randomDiceImage2="dice"+randNumber2+".png";
var randomImagesSrc1="./images/"+randomDiceImage1;
var randomImagesSrc2="./images/"+randomDiceImage2;
var image1=document.querySelectorAll("img")[0];
var image2=document.querySelectorAll("img")[1];
image1.setAttribute("src",randomImagesSrc1)
image2.setAttribute("src",randomImagesSrc2)

if(randNumber1>randNumber2)
{
    document.querySelector("h1").innerHTML="Player 1 Wins &#127881;";
}
else if(randNumber1<randNumber2)
    {
    document.querySelector("h1").innerHTML="Player 2 Wins &#x1F389;"
}
else
{
    document.querySelector("h1").innerHTML="Draw !"
}