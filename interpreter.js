const array = new Array(1000).fill(0)
// fills an array with 1000 0s

const arguments = '+++++++++++++++[>++>+++>++++>+++++>++++++>+++++++>++++++++<<<<<<<-]+++++++++++++++>>>>-.>+++++++.>>--.<<.<+++++++++.>++.>>----.<.>--.++++.<<<<<<<-----.'
// Spells Javascript 
const inputs = ['A','B'] 
// Not used for current input





const interpret = (args,inputs) => {
    let output = []
    let inputNum = 0
    const matches = {}
    let pointer = 0 // Uses to traverse through the main array
    let instructionPointer = 0 // Used to traverse through the input array

    //revursive function to match each parentheses to its respective closing parentheses
    let open = args.match(/\[/g)?.length 
    let close = args.match(/\]/g)?.length 
    if (open !== close) return console.log('Error')
    let arr = []
    args.split('').forEach((x,i,a) =>{
        if (x=='[') arr.push(['open',i])
        if (x==']') arr.push(['close', i])
      })
      const recurse = arr => {
        if (!arr.length) return
        for (let i in arr) {
          if(arr[i][0] == 'open' && arr[parseInt(i) + 1][0] == 'close'){
            matches[arr[i][1]] = arr[parseInt(i) + 1][1]
            arr.splice(i,2)
            recurse(arr)
          } 
        }
      }
      recurse(arr)


    a = args.split('')
    while (instructionPointer < a.length) {
        switch (a[instructionPointer]) {
            case '.':
                output.push(String.fromCharCode(array[pointer])) // Gets the ASCII character from the value at the pointer
                instructionPointer++
                break;
            case '>':
                pointer +=1 // Moves the pointer accross to the right
                instructionPointer++
                break;
            case '<':
                pointer -=1 // Moves the pointer accross to the left
                instructionPointer++
                break;
            case '+':
                array[pointer]++ // Increments the value at the pointer of the main array
                instructionPointer++
                break;
            case '-':
                array[pointer]-- // Decrements the value at the pointer of the main array
                instructionPointer++
                break;
            case ',':
                array[pointer] = inputs[inputNum] // Writes an inputted ASCII value to the array as an integer
                inputNum++
                instructionPointer++
                break;     
            case '[': 
                if (array[pointer] == 0) {
                    instructionPointer = matches[instructionPointer] + 1 // If value at the pointer is 0, skip to the end of the loop
                } else {
                    instructionPointer++ // If value at the pointer isnt zero, execute the code inside the loop
                }
                break;
            case ']': 
            if (array[pointer] == 0) {
                instructionPointer++ // If the value at the pointer is 0, skip past
            } else {
                for (const property in matches) {
                    if (matches[property] == instructionPointer) {                 
                        instructionPointer = parseInt(property) +1 // If the value at the pointer isnt 0, execute the code inside the loop again
                    }
                }
                break;
            }
            default:
                instructionPointer++ // ignores all other characters
            
        }
    } return output.join('') //Ouputs the array as a string
}

console.log(interpret(arguments,inputs))
