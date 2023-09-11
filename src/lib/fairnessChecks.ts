export const perms = (code:string) : string[] => {
    const names = [...new Set(code.split(""))].sort()
    let result:string[] = [""]
    names.forEach(l=>{
        // insert permutations using l
        result.forEach(perm=>{
            [...Array(perm.length+1).keys()].forEach(i=>{
                const j = perm.length-i
                result.push(perm.slice(0,j)+l+perm.slice(j))
            })
        })
    })
    // sort short to long, otherwise keep order
    // (which keeps subpermutations together)
    return result.sort((a,b)=>{
        return a.length-b.length
    })
}

export interface fairnessCheck {
    [permutation:string]:number
}

// Based upon http://gofirstdice.ericharshbarger.org/doku.php?id=fast_perm_check
// Locks up with sufficiently many letters in code...
export const computePermCheck = (code:string) : fairnessCheck => {
    let permCheck:fairnessCheck = {}
    // zero out each possible permutation initially
    perms(code).forEach(perm=>{
        permCheck[perm]=0
    })
    // count the empty permutation
    permCheck[""]=1
    code.split("").forEach(l=>{
        Object.keys(permCheck).forEach(perm=>{
            if (perm.indexOf(l)==-1) {
                permCheck[perm+l] += permCheck[perm]
            }
        })
    })
    return permCheck
}

