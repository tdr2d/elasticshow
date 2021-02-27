// @flow

import React, { Fragment } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { mediaMin } from '@divyanshu013/media';
import { SelectedFilters } from '@appbaseio/reactivesearch';

import Flex from '../Flex';
import ShowHideColumn from './ShowHideColumns';
import ModeSwitch from './ModeSwitch';
import ExportData from './ExportData';
import DeleteRows from './DeleteRows';
import UpdateRow from './UpdateRow';
import PageSize from './PageSize';
import SortFilter from './SortFilter';
import MultipleUpdate from './MultipleUpdate';

import { getSelectedRows } from '../../reducers/selectedRows';
import { getUpdatingRow } from '../../reducers/updatingRow';

type Props = {
	onReload: () => void,
	selectedRows: string[],
	updatingRow?: any,
};

const Actions = ({ onReload, selectedRows, updatingRow }: Props) => (
	<div
		style={{
			margin: '10px 0',
			// display: 'none',
			display: 'block', // FIXME responsivness
		}}
	>
		<Flex alignItems="flex-end" justifyContent="space-between">
			<div>
				{selectedRows.length > 0 ? (
					<Fragment>
						<DeleteRows />
						{updatingRow ? <UpdateRow /> : <MultipleUpdate />}
					</Fragment>
				) : (
					<Fragment>
						<ExportData />
						<Button
							icon="reload"
							onClick={onReload}
							style={{ marginRight: '5px' }}
						>
							Reload
						</Button>
					</Fragment>
				)}
				<ModeSwitch />
			</div>
			<Flex alignItems="center">
				<SelectedFilters
					style={{
						marginRight: '5px',
					}}
				/>
				<SortFilter />
				<PageSize />
				<ShowHideColumn />
			</Flex>
		</Flex>
	</div>
);

const mapStateToProps = state => ({
	selectedRows: getSelectedRows(state),
	updatingRow: getUpdatingRow(state),
});

export default connect(mapStateToProps)(Actions);
