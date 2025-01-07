
async function printAllcards(){
    try{
        const res = await fetch('http://localhost:8181/cards');
        const data = await res.json();
        data.forEach(card => {
            console.log(card);
        });
    } catch (error){
        console.error(error);
    }
}

printAllcards();
