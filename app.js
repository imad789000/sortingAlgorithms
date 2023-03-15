colsContainer = document.querySelector(".colsContainer")
function setColumns()
{
    document.querySelector(".ElementAmount").innerHTML = "Elements: " + document.querySelector(".numberOfCols").value
    if (colsContainer.children[0] != undefined)
    {
        Array.from(colsContainer.children).forEach(el => {colsContainer.removeChild(el)})
    }
    for(let i = 0; i < document.querySelector(".numberOfCols").value; i++)
    {
        col = document.createElement("div")
        col.className = "col"
        colsContainer.append(col)
    }
    cols = document.querySelectorAll(".col")
    
    let colsHeights = []
    cols.forEach(element => {
        let checkHeight = function() 
        {
            let height = Math.random() * Math.floor(parseInt(getComputedStyle(document.querySelector(".colsContainer")).height))
            if(colsHeights.includes(height))
            {
                checkHeight()
            }
    
            else
            {
                element.style.height = (height).toString() +"px"
                colsHeights.push(height)
            }
        }
    
        checkHeight()
    });
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
let calledTimes = 0
async function doneEffect()
{
    let allCols = colsContainer.children
    for(let i =0; i < allCols.length ; i++)
    {
        allCols[i].style.background = "black"
        setTimeout(() => {
            allCols[i].style.background = "linear-gradient(to top, #4568dc, #b06ab3)"
        }, 10);
        await sleep(10)
    }
}

async function bubbleSort()
{
    try{
        let colss = []
        Array.from(colsContainer.children).forEach(el => {
            colss.push(parseInt(el.style.height))
        })

        //looping through through all elements of the list
        for(let j = 0; j < colss.length - 1; j++)
        {  
            //checking if the element is greater than the next element
            if(colss[j] > colss[j + 1])
            {
                //applying highlight effect
                colsContainer.children[j].style.background = "black"
                colsContainer.children[j + 1].style.background = "black"
                setTimeout(() => {
                    colsContainer.children[j].style.background = "linear-gradient(to top, #4568dc, #b06ab3)"
                    colsContainer.children[j + 1].style.background = "linear-gradient(to top, #4568dc, #b06ab3)"
                }, document.querySelector(".slider").value);
                await sleep(document.querySelector(".slider").value)

                //replacing the first value with the second and the second with the first
                let temp = colss[j]
                colss[j] = colss[j + 1]
                colss[j + 1] = temp

                //applying heights
                colsContainer.children[j].style.height = colss[j].toString()+"px"
                colsContainer.children[j + 1].style.height = colss[j + 1].toString()+"px"
            }
        }
        
        //recalling the function at the number of times of the number of elements
        if(calledTimes < colsContainer.children.length)
        {
            calledTimes++
            setTimeout(() => {
                bubbleSort()
            }, document.querySelector(".slider").value);

        }

        else{
            doneEffect()
            calledTimes = 0
        }
    }
    catch{return}

}

async function mergeSort(list)
{
    try{
        if(list.length <= 1) return list
        
        let mid = Math.floor(list.length / 2)
        let left = await mergeSort(list.slice(0, mid))
        let right = await mergeSort(list.slice(mid))

        let sortedArr = []
        while (left.length && right.length)
        {
            await sleep(document.querySelector(".slider").value)
            if(left[0] < right[0])
            {
                sortedArr.push(left.shift())
            }
            else
            {
                sortedArr.push(right.shift())
            }
        }

        let sorted = [...sortedArr, ...left, ...right]
        let ret = []
        for(let j = 0; j < cols.length; j++)
        {
            if(ret.length == sorted.length)
            {
                break
            }
            if(list.includes(parseFloat(colsContainer.children[j].style.height)))
            {
                ret.push(colsContainer.children[j])
            }
        }

        for(let i = 0; i < sorted.length; i++)
        {

            ret[i].style.height = sorted[i].toString()+"px"
            ret[i].style.background = "black"
            setTimeout(() => {
                ret[i].style.background = "linear-gradient(to top, #4568dc, #b06ab3)"        
            }, document.querySelector(".slider").value);
            await sleep(document.querySelector(".slider").value)
            
        }
        return [...sortedArr, ...left, ...right]
    }
    catch{return}
}

async function sortHelper()
{
    let colss = []
    Array.from(colsContainer.children).forEach(el => {
        colss.push(parseFloat(el.style.height))
    })

    let sortedCols = await mergeSort(colss)
    await doneEffect()
}

setColumns()