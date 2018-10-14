Given a random seed

1. Enumerate sets [all mtg sets](https://api.scryfall.com/sets)
  * Has 3 letter "code"
	* Can grab "card_count"
	* Need to somehow filter otherwise
2. From that enumeration, order by set (natural ordering...?)
3. Can count number of cards
4. Use a uniform space filling [random number
	 generator](https://www.isid.ac.in/~deepayan/ICP2017/projects/Debraj_Bose/report.pdf)
