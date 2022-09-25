// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };


  
//DNA Factory 함수
const pAeqoutFactory = (specimeNum, dna) => {
    return {
        specimeNum,
        dna,
        //돌연변이 생성
        mutate() {
            const rand = Math.floor(Math.random()*this.dna.length)
            let newBase = returnRandBase();
            while (this.dna[rand] === newBase) {
              newBase = returnRandBase();
            }
            this.dna[rand] = newBase;
            return this.dna;
        },
        //DNA 중복률 
       compareDNA(otherOrg) {
        const overlap = this.dna.reduce((acc, curr, idx, arr) => {
          if (arr[idx] === otherOrg.dna[idx]) {
            return acc + 1;
          } else {
            return acc
          }
        }, 0);
        const percentOfDNAshared = (overlap/this.dna.length) * 100;
        const percentageTo2Deci = percentOfDNAshared.toFixed(2);
        console.log(`${this.specimanNum} and ${otherOrg.specimanNum} have ${percentageTo2Deci}% DNA in common.`);
       } ,
       //C, G 함유량 60% 이상이면 생존율 높음
       willLikelySurvive() {
        const survive = this.dna.filter(item => item === 'C' || item === 'G');
        return survive.length /this.dna.length >= 0.6;
       }
    }
};

const surviVingSpecimen = [];
let counter = 1;
//샘플 DNa 생성
while (surviVingSpecimen.length < 30) {
  let newogrGan = pAeqoutFactory(counter, mockUpStrand());
  if (newogrGan.willLikelySurvive()) {
    surviVingSpecimen.push(newogrGan);
  }
  counter++;
}

console.log(surviVingSpecimen);
