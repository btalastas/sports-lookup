# sports-lookup

## ***Description***

Lookup MLB stats for analyzing matchups between teams and players.
Jupyter notebook is used to run the python api calls and display the data.

## ***Functionalities***

- Get MLB schedule for current day.
- Get pitcher stats for season.

### ***Future functions***

- Pitcher stats vs current opponent.
- Pitcher/Batter stats last 5/10 games.
- Plots for types of pitches pitchers throw and its success.
- Plots for batter statistics.
- Genereate JSON to be used for aws lambda.

## ***Getting started***

### *How to Run*

#### **MacOS/Linux (Preferred)**

1. Navigate to a directory and run the command.

```sh
git clone https://github.com/btalastas/sports-lookup.git
```

2. There are various Python packages in order for these programs to work. Navigate to the `sports-lookup` directory and run the following command in your terminal.

```sh
pip3 install -r requirements.txt
```

3. The text editor of choice I used was VS Code. I installed the Jupyter extension to run the Jupyter notebook inside VS Code. Select the Python 3.x environment as your kernel for the notebook.

---

#### **Windows**

1. Install anaconda on your system and open up the anaconda prompt program. Create a new conda environment using the following command.

```sh
conda create --name your_env_name 
```

2. Activate the conda environment inside the same anaconda prompt.

```sh
conda activate your_env_name
```

3. Navigate to a directory and clone the repository.

```sh
git clone https://github.com/btalastas/sports-lookup.git
```

4. Navigate to the `sports-lookup` directory and run the command in the anaconda prompt.

```sh
conda install --file requirements.txt
```

5. There may be some packages that you cannot install using anaconda. Inside the anaconda prompt with your newly activated conda environment, run the following command.

```sh
pip install -r requirements.txt
```

6. Follow step 3 from *MacOS/Linux*

---

### *Dependencies*

- Python 3.x

## Authors

Bjorn Talastas [email](<btalasta@gmu.edu> "btalasta@gmu.edu")

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
