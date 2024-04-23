import Display from './Display'

function Statistics({good, neutral, bad, all, average}){
    
    if(all == 0){
        return(
            <p>No feedback given.</p>
        )
    }  

    return(
        <>
        <h1>Statistics</h1>
        <Display text={"good"} value={good}/>
        <Display text={"neutral"} value={neutral}/>
        <Display text={"bad"} value={bad}/>

        <Display text={"all"} value={all}/>
        <Display text={"average"} value={average/all}/>
        <Display text={"positive"} value={(good/all)*100}/>
        </>
    )
}

export default Statistics