# Random 32 char password
(0..31).map { (rand(79)+47).chr }.join
