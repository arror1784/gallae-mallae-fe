
function t(){

    return {
            a:()=>console.log('a'),
            b:'hello'
        }

}

function s({a}){

    a()
}
s(t())
