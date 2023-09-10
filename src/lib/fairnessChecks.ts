interface fairnessCheck {
    [permutation:string]:number
}

// Based upon http://gofirstdice.ericharshbarger.org/doku.php?id=fast_perm_check
// Locks up with sufficiently many letters in code...
export const computePermCheck = (code:string) : fairnessCheck => {
    let permCheck:fairnessCheck = {"": 1}
    code.split("").forEach(l=>{
        Object.keys(permCheck).forEach(perm=>{
            if (perm.indexOf(l)==-1) {
                if (Object.keys(permCheck).includes(perm+l)) {
                    permCheck[perm+l] += permCheck[perm]
                } else {
                    permCheck[perm+l] = permCheck[perm] 
                }
            }
        })
    })
    const perms = Object.keys(permCheck).sort((a,b)=>{
        if (a.length==b.length) {
            if (a<b) {
                return -1
            }
            return 1
        }
        return a.length-b.length
    })
    let sortedPermCheck:fairnessCheck = {}
    perms.forEach(perm=>sortedPermCheck[perm]=permCheck[perm])
    return sortedPermCheck
}

// ,
//     {
//         "name": "Naive serpentine",
//         "code": "abcdefghhgfedcbaabcdefghhgfedcbaabcdefghhgfedcba"
//     }