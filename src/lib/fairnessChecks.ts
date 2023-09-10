interface fairnessCheck {
    [permutation:string]:number
}

// Based upon http://gofirstdice.ericharshbarger.org/doku.php?id=fast_perm_check
// Locks up with sufficiently many letters in code...
export const computePermCheck = (code:string) : fairnessCheck => {
    let perms:string[] = [""]
    let permCheck:fairnessCheck = {"": 1}
    code.split("").forEach(l=>{
        perms.forEach(perm=>{
            if (perm.indexOf(l)==-1) {
                if (perms.includes(perm+l)) {
                    permCheck[perm+l] += permCheck[perm]
                } else {
                    perms.push(perm+l)
                    permCheck[perm+l] = permCheck[perm] 
                }
            }
        })
    })
    return permCheck
}

// ,
//     {
//         "name": "Naive serpentine",
//         "code": "abcdefghhgfedcbaabcdefghhgfedcbaabcdefghhgfedcba"
//     }