import React from "react";
import { connect } from "react-redux";

import "./BasketDropDown.scss";

import * as action from "../../redux/actions";
import Button from "../UI/Button/Button";
import BasketItem from "./BasketItem/BasketItem";
import { withRouter } from "react-router-dom";

let BasketDropDown = ({
	showBasket,
	basketItems,
	addItem,
	removeItem,
	toggleShowBasket,
	history,
	numberOfItems,
}) => {
	const classes = ["basket-dropdown", showBasket ? "active" : null];
	return (
		<div className={classes.join(" ")}>
			<div className="basket-items">
				{basketItems.length ? (
					basketItems.map((item) => (
						<BasketItem
							key={item.id}
							item={item}
							addItem={addItem}
							removeItem={removeItem}
						/>
					))
				) : (
					<span className="empty-message">There is no items in the basket</span>
				)}
			</div>
			<Button
				color="black"
				onClick={() => {
					toggleShowBasket();
					history.push("/checkout");
				}}
				disabled={!numberOfItems}
			>
				Go to checkout !
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	basketItems: state.basket.basketItems,
	numberOfItems: state.basket.numberOfItems,
	showBasket: state.basket.showBasket,
});

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(action.addItem(item)),
	removeItem: (item) => dispatch(action.removeItem(item)),
	toggleShowBasket: () => dispatch(action.toggleShowBasket()),
});
BasketDropDown = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(BasketDropDown)
);

export default BasketDropDown;
