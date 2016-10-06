I was frustrated checking the in-store availability for specific apple products by hand and so I came up with this simple script which checks them with one call in the shell.

Code is work in progress and must be modified to request differnt countryCodes, zip Codes and products. More updates will follow.

Example Output:

```
$ node pickup-message.js

Watch 2 38mm Steel Leather (MNP72ZD/A)
	Kurfürstendamm (Berlin Apple Store, Kurfürstendamm 8.59 kmkm)
	shipping (7 Nov)
---------------------------------------
Watch 2 38mm Steal Space Black Sport (MP492ZD/A)
	Kurfürstendamm (Berlin Apple Store, Kurfürstendamm 8.59 kmkm)
	shipping (7 Nov)
---------------------------------------
Watch 2 38mm Steel Leather (MNP72ZD/A)
	Kurfürstendamm (Berlin Apple Store, Kurfürstendamm 8.59 kmkm)
	shipping (7 Nov)
---------------------------------------
Watch 2 38mm Steal Space Black Sport (MP492ZD/A)
	Kurfürstendamm (Berlin Apple Store, Kurfürstendamm 8.59 kmkm)
	shipping (7 Nov)
---------------------------------------
```
