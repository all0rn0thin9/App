const likeBtn = document.querySelector(".like__btn1");
				let likeIcon = document.querySelector("#icon"),
				  count = document.querySelector("#count");
				
				let clicked = false;
	
				likeBtn.addEventListener("click", () => {
				  if (!clicked) {
					clicked = true;
					likeIcon.innerHTML = `<i class="lnr lnr-heart"></i>`;
					count.textContent++;
				  } else {
					clicked = false;
					likeIcon.innerHTML = `<i class="lnr lnr-heart"></i>`;
					count.textContent--;
				  }
				});