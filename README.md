# prompt2finetune
Practical AI: From Prompting to Fine-Tuning

### Prerequisites
- Setup the colab

  - Sign up to <a href="https://colab.research.google.com/" target="_blank">https://colab.research.google.com/</a>

- Setup openrouter (to play with AI)

  - Sign up to <a href="https://openrouter.ai/" target="_blank">https://openrouter.ai/</a>
  
  - click on the profile icon and click on the `key` menu
  ![alt text](images//openrouterkey.png)
  
  - click on the `create new key` button and fill up the name and leave the next fields blank and click on create. Copy the key and paste it in the any notepad
  ![alt text](images//createkey.png)

  - copy the created key
  ![alt text](images//key-copy.png)

  - Goto <a href="https://colab.research.google.com/" target="_blank">colab</a> and click on the `key` icon on the left menu.
  ![alt text](images//setup-key.png)

  - Click on the `Add New Secret`.

  - Give Secret `Name` as `API_KEY` and set `Value` to the key we have created in openrouter.

  - Turn on the `Note Book Access` toggle to allow this secret to consume in the colab notebooks.



### Prompting Strategies
<a href="https://colab.research.google.com/github/kissflow/prompt2finetune/blob/main/Prompting_Strategy.ipynb" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>


### RAG Implementation
<a href="https://colab.research.google.com/github/kissflow/prompt2finetune/blob/main/Product_Review_using_RAG.ipynb" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

### Agent Implementation
<a href="https://colab.research.google.com/github/kissflow/prompt2finetune/blob/main/L1_Support_Agent_CrewAI.ipynb" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>


### Finetuning:
- Before Finetuning <a href="https://colab.research.google.com/github/kissflow/prompt2finetune/blob/main/Llama_4bit_Before_tuning.ipynb" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

- After Finetuning <a href="https://colab.research.google.com/github/kissflow/prompt2finetune/blob/main/Llama_4bit_after_tuning.ipynb" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

- Click on Connect and `Select Change runtime type`
![alt text](images//connect.png)

- Choose Select `Runtime Type` - Python and `Hardware accelerator` - T4 GPU, and click Save
![alt text](images//changeruntime.png)

- Play with colab

- Delete the runtime
![alt text](images//deleteruntime.png)